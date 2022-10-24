import { getInherentScore } from 'src/modules/risk/riskUtils';
import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ColorBadgeSelectFormItem, {
  generateColorBadgeSelectOptions,
} from 'src/view/shared/form/items/ColorBadgeSelectFormItem';
import EnumColorBadgeFormItem from 'src/view/shared/form/items/EnumColorBadgeFormItem';
import EnumColorBadgeViewItem from 'src/view/shared/view/EnumColorBadgeViewItem';
import EnumSliderFormItem from 'src/view/shared/form/items/EnumSliderFormItem';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import formSelectors from 'src/modules/form/formSelectors';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import MDBox from 'src/mui/components/MDBox';
import NewsArticleAutocompleteFormItem from 'src/view/newsArticle/autocomplete/NewsArticleAutocompleteFormItem';
import NoteAutocompleteFormItem from 'src/view/note/autocomplete/NoteAutocompleteFormItem';
import PolicyAutocompleteFormItem from 'src/view/policy/autocomplete/PolicyAutocompleteFormItem';
import PolicyTemplateAutocompleteFormItem from 'src/view/policyTemplate/autocomplete/PolicyTemplateAutocompleteFormItem';
import ProductAutocompleteFormItem from 'src/view/product/autocomplete/ProductAutocompleteFormItem';
import RiskCategoryAutocompleteFormItem from 'src/view/riskCategory/autocomplete/RiskCategoryAutocompleteFormItem';
import riskEnumerators from 'src/modules/risk/riskEnumerators';
import Storage from 'src/security/storage';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import TaskAutocompleteFormItem from 'src/view/task/autocomplete/TaskAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';

function NewRiskLayout(props) {
  const { sidenavColor } = selectMuiSettings();
  const { title, hiddenImpossibleFields } = props;
  const { setValue } = useFormContext();
  const defaultLikelihood = riskEnumerators.likelihood[0];
  const defaultImpact = riskEnumerators.impact[0];
  const [inherentScore, setInherentScore] = useState(
    getInherentScore(defaultLikelihood, defaultImpact),
  );
  const [likelihood, setLikelihood] = useState(
    defaultLikelihood,
  );
  const [impact, setImpact] = useState(defaultImpact);
  const onChangeLikelihoodOrImpact = (
    likelihoodVal,
    impactVal,
  ) => {
    const score = getInherentScore(
      likelihoodVal,
      impactVal,
    );
    setValue('inherentScore', score, {
      shouldValidate: false,
      shouldDirty: true,
    });
    setInherentScore(score);
    setLikelihood(likelihoodVal);
    setImpact(impactVal);
  };
  const refresh = useSelector(formSelectors.selectRefresh);
  useEffect(() => {
    onChangeLikelihoodOrImpact(
      defaultLikelihood,
      defaultImpact,
    );
  }, [refresh]);
  return (
    <MDBox px={0.8}>
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <GradientTitle>
            {title ?? i18n('entities.risk.new.title')}
          </GradientTitle>
        </Grid>
        <Grid item md={6} xs={12}>
          <InputFormItem
            name="title"
            label={i18n('entities.risk.fields.title')}
            required={true}
            variant="standard"
            autoFocus
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <RiskCategoryAutocompleteFormItem
            name="category"
            label={i18n('entities.risk.fields.category')}
            required={true}
            showCreate={true}
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextAreaFormItem
            name="description"
            label={i18n('entities.risk.fields.description')}
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ColorBadgeSelectFormItem
            name="status"
            label={i18n('entities.risk.fields.status')}
            options={generateColorBadgeSelectOptions(
              riskEnumerators.status,
              riskEnumerators.statusColor,
              'entities.risk.enumerators.status',
            )}
            required={true}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <UserAutocompleteFormItem
            name="owner"
            label={i18n('entities.risk.fields.owner')}
            required={false}
            showCreate={true}
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <EnumSliderFormItem
            name="likelihood"
            label={i18n('entities.risk.fields.likelihood')}
            value={likelihood}
            i18nPrefix="entities.risk.enumerators.likelihood"
            renderValue={(props) => (
              <EnumColorBadgeViewItem {...props} />
            )}
            enums={riskEnumerators.likelihood}
            colors={riskEnumerators.likelihoodColor}
            onChange={(likelihoodVal) => {
              onChangeLikelihoodOrImpact(
                likelihoodVal,
                impact,
              );
            }}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <EnumSliderFormItem
            name="impact"
            label={i18n('entities.risk.fields.impact')}
            value={impact}
            i18nPrefix="entities.risk.enumerators.impact"
            renderValue={(props) => (
              <EnumColorBadgeViewItem {...props} />
            )}
            enums={riskEnumerators.impact}
            colors={riskEnumerators.impactColor}
            onChange={(impactVal) => {
              onChangeLikelihoodOrImpact(
                likelihood,
                impactVal,
              );
            }}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <EnumColorBadgeFormItem
            name="inherentScore"
            value={inherentScore}
            enums={riskEnumerators.inherentScore}
            colors={riskEnumerators.inherentScoreColor}
            i18nPrefix="entities.risk.enumerators.inherentScore"
            label={i18n(
              'entities.risk.fields.inherentScore',
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputNumberFormItem
            name="residualScore"
            label={i18n(
              'entities.risk.fields.residualScore',
            )}
            required={true}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputFormItem
            name="cost"
            label={i18n('entities.risk.fields.cost')}
            required={true}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <NoteAutocompleteFormItem
            name="notes"
            label={i18n('entities.risk.fields.notes')}
            required={false}
            showCreate={true}
            mode="multiple"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TagAutocompleteFormItem
            name="tags"
            label={i18n('entities.risk.fields.tags')}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <NewsArticleAutocompleteFormItem
            name="newsArticles"
            label={i18n(
              'entities.risk.fields.newsArticles',
            )}
            mode="multiple"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ProductAutocompleteFormItem
            name="products"
            label={i18n('entities.risk.fields.products')}
            mode="multiple"
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <PolicyTemplateAutocompleteFormItem
            name="policyTemplates"
            label={i18n(
              'entities.risk.fields.policyTemplates',
            )}
            mode="multiple"
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <PolicyAutocompleteFormItem
            name="policies"
            label={i18n('entities.risk.fields.policies')}
            mode="multiple"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FilesFormItem
            name="attachments"
            label={i18n('entities.risk.fields.attachments')}
            required={false}
            storage={Storage.values.riskAttachments}
            max={undefined}
          />
        </Grid>
        <Grid item xs={12}>
          <TaskAutocompleteFormItem
            name="tasks"
            label={i18n('entities.risk.fields.tasks')}
            required={false}
            showCreate={true}
            mode="multiple"
            variant="standard"
            fullWidth
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default NewRiskLayout;
