import { getAbsoluteDateTimeByHour } from 'src/modules/utils';
import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import ColorBadgeSelectFormItem, {
  generateColorBadgeSelectOptions,
} from 'src/view/shared/form/items/ColorBadgeSelectFormItem';
import CustomStyledSelectFormItem from 'src/view/shared/form/items/CustomStyledSelectFormItem';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import NewsArticleAutocompleteFormItem from 'src/view/newsArticle/autocomplete/NewsArticleAutocompleteFormItem';
import NoteAutocompleteFormItem from 'src/view/note/autocomplete/NoteAutocompleteFormItem';
import PolicyAutocompleteFormItem from 'src/view/policy/autocomplete/PolicyAutocompleteFormItem';
import PolicyTemplateAutocompleteFormItem from 'src/view/policyTemplate/autocomplete/PolicyTemplateAutocompleteFormItem';
import ProductAutocompleteFormItem from 'src/view/product/autocomplete/ProductAutocompleteFormItem';
import Storage from 'src/security/storage';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import taskEnumerators from 'src/modules/task/taskEnumerators';
import TaskListAutocompleteFormItem from 'src/view/taskList/autocomplete/TaskListAutocompleteFormItem';
import TaskPriorityAutocompleteFormItem from 'src/view/taskPriority/autocomplete/TaskPriorityAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';

function NewTaskLayout(props) {
  const { sidenavColor } = selectMuiSettings();
  const { title, initialValues, hiddenImpossibleFields } =
    props;
  const { setValue, getValues } = useFormContext();
  const [dueDate, setDueDate] = useState(
    props.record?.dueDate || null,
  );
  return (
    <MDBox px={0.8}>
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <GradientTitle>
            {title ?? i18n('entities.task.new.title')}
          </GradientTitle>
        </Grid>
        <Grid item md={6} xs={12}>
          <InputFormItem
            name="title"
            label={i18n('entities.task.fields.title')}
            required={true}
            variant="standard"
            autoFocus
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TaskListAutocompleteFormItem
            name="taskList"
            label={i18n('entities.task.fields.taskList')}
            required={true}
            showCreate={true}
            variant="standard"
            mode="multiple"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextAreaFormItem
            name="description"
            label={i18n('entities.task.fields.description')}
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ColorBadgeSelectFormItem
            name="status"
            label={i18n('entities.task.fields.status')}
            options={generateColorBadgeSelectOptions(
              taskEnumerators.status,
              taskEnumerators.statusColor,
              'entities.task.enumerators.status',
            )}
            required={true}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TaskPriorityAutocompleteFormItem
            name="priority"
            label={i18n('entities.task.fields.priority')}
            required={true}
            showCreate={true}
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <UserAutocompleteFormItem
            name="owner"
            label={i18n('entities.task.fields.owner')}
            required={false}
            showCreate={true}
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <UserAutocompleteFormItem
            name="approver"
            label={i18n('entities.task.fields.approver')}
            required={false}
            showCreate={true}
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <DatePickerFormItem
            name="dueDate"
            label={i18n('entities.task.fields.dueDate')}
            required={false}
            variant="standard"
            onAccept={(value) => {
              const newValue =
                getAbsoluteDateTimeByHour(value);
              setDueDate(newValue?.toISOString() || null);
              setValue('dueDate', newValue, {
                shouldValidate: false,
                shouldDirty: true,
              });
            }}
            value={dueDate}
            forceValue
            showTime
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <CustomStyledSelectFormItem
            name="repeat"
            label={i18n('entities.task.fields.repeat')}
            value={initialValues.repeat}
            options={taskEnumerators.repeat.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.task.enumerators.repeat.${value}`,
                ),
                style:
                  value === 'Never'
                    ? null
                    : {
                        fontWeight: 'bold',
                      },
              }),
            )}
            required={true}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TagAutocompleteFormItem
            name="tags"
            label={i18n('entities.task.fields.tags')}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <NewsArticleAutocompleteFormItem
            name="newsArticles"
            label={i18n(
              'entities.task.fields.newsArticles',
            )}
            mode="multiple"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ProductAutocompleteFormItem
            name="products"
            label={i18n('entities.task.fields.products')}
            mode="multiple"
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <PolicyTemplateAutocompleteFormItem
            name="policyTemplates"
            label={i18n(
              'entities.task.fields.policyTemplates',
            )}
            mode="multiple"
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <PolicyAutocompleteFormItem
            name="policies"
            label={i18n('entities.task.fields.policies')}
            mode="multiple"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FilesFormItem
            name="attachments"
            label={i18n('entities.task.fields.attachments')}
            required={false}
            storage={Storage.values.taskAttachments}
            max={undefined}
          />
        </Grid>
        {!hiddenImpossibleFields && (
          <>
            <Grid item md={6} xs={12}>
              <NoteAutocompleteFormItem
                name="notes"
                label={i18n('entities.task.fields.notes')}
                required={false}
                showCreate={true}
                mode="multiple"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <DatePickerFormItem
                name="completedDate"
                label={i18n(
                  'entities.task.fields.completedDate',
                )}
                required={false}
                variant="standard"
                showTime
              />
            </Grid>
          </>
        )}
      </Grid>
    </MDBox>
  );
}

export default NewTaskLayout;
