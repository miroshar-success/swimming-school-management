import { i18n } from 'src/i18n';
import { v4 as uuid } from 'uuid';
import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';
import axios from 'axios';
import filesize from 'filesize';

export default class FileUploader {
  static validate(file, config) {
    if (!config) {
      return;
    }

    if (config.image) {
      if (!file.type.startsWith('image')) {
        throw new Error(i18n('fileUploader.image'));
      }
    }

    if (
      config.storage.maxSizeInBytes &&
      file.size > config.storage.maxSizeInBytes
    ) {
      const size = filesize.partial({
        base: 2,
        standard: 'jedec',
      });
      throw new Error(
        i18n(
          'fileUploader.size',
          size(config.storage.maxSizeInBytes),
        ),
      );
    }

    const extension = extractExtensionFrom(file.name);

    if (
      config.formats &&
      config.formats.length > 0 &&
      !config.formats.find(
        (v) => v.toLowerCase() === extension.toLowerCase(),
      )
    ) {
      throw new Error(
        i18n(
          'fileUploader.formats',
          config.formats.join(', '),
        ),
      );
    }
  }

  static async upload(file, config) {
    try {
      this.validate(file, config);
    } catch (error) {
      return Promise.reject(error);
    }

    const extension = extractExtensionFrom(file.name);
    const id = uuid();
    const filename = `${id}.${extension}`;

    const {
      uploadCredentials,
      downloadUrl,
      privateUrl,
      uploader,
      uploadedAt,
    } = await this.fetchFileCredentials(
      filename,
      file.name,
      config,
    );

    const data = {
      title: extractNameFrom(file.name),
      name: file.name,
      sizeInBytes: file.size,
      ...(uploadCredentials && uploadCredentials.publicUrl
        ? { publicUrl: uploadCredentials.publicUrl }
        : {}),
      privateUrl,
      downloadUrl,
      new: true,
      uploader,
      uploadedAt,
      tags: [],
    };

    return {
      ...data,
      id: await this.uploadToServer(file, {
        ...uploadCredentials,
        fields: {
          ...uploadCredentials.fields,
          ...data,
          uploader: uploader.id,
        },
      }),
    };
  }

  static async fetchFileCredentials(
    filename,
    originalFilename,
    config,
  ) {
    const tenantId = AuthCurrentTenant.get();

    const { data } = await authAxios.get(
      `/tenant/${tenantId}/file/credentials`,
      {
        params: {
          filename: filename,
          original: originalFilename,
          storageId: config.storage.id,
        },
      },
    );

    return data;
  }

  static async uploadToServer(file, uploadCredentials) {
    try {
      const url = uploadCredentials.url;
      const formData = new FormData();

      for (const [key, value] of Object.entries(
        uploadCredentials.fields || {},
      )) {
        formData.append(key, value as string);
      }
      formData.append('file', file);

      const response = await authAxios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async tags(id, data) {
    const body = {
      id,
      data,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.put(
      `/tenant/${tenantId}/file/${id}/tags`,
      body,
    );

    return response.data;
  }
}

export function extractExtensionFrom(filename) {
  if (!filename) {
    return null;
  }

  const regex = /(?:\.([^.]+))?$/;
  const exec = regex.exec(filename);

  if (!exec) {
    return null;
  }

  return exec[1].toLowerCase();
}

export function extractNameFrom(filename) {
  if (!filename) {
    return null;
  }

  return filename.substring(0, filename.lastIndexOf('.'));
}
