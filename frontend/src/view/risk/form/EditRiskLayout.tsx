import { Card, Grid } from '@mui/material';
import { getInherentScore } from 'src/modules/risk/riskUtils';
import { i18n } from 'src/i18n';
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
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
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

function EditRiskLayout(props) {
  const { initialValues } = props;
  const { setValue } = useFormContext();
  const [inherentScore, setInherentScore] = useState(
    initialValues.inherentScore ?? 'Low',
  );
  const [likelihood, setLikelihood] = useState(
    initialValues.likelihood,
  );
  const [impact, setImpact] = useState(
    initialValues.impact,
  );
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
      initialValues.likelihood,
      initialValues.impact,
    );
  }, [refresh]);
  return (
    <Grid container spacing={1.6}>
      <Grid item md={8} xs={12}>
        <Card>
          <MDBox px={2.4} py={2.4}>
            <Grid spacing={1.6} container>
              <Grid item xs={12}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h5">
                    {i18n('entities.risk.info')}
                  </MDTypography>
                  <MDTypography
                    variant="button"
                    color="text"
                    fontWeight="bold"
                  >
                    {`# ${initialValues.reference}`}
                  </MDTypography>
                </MDBox>
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
                  label={i18n(
                    'entities.risk.fields.category',
                  )}
                  required={true}
                  showCreate={true}
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextAreaFormItem
                  name="description"
                  label={i18n(
                    'entities.risk.fields.description',
                  )}
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <ColorBadgeSelectFormItem
                  name="status"
                  label={i18n(
                    'entities.risk.fields.status',
                  )}
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
                  label={i18n(
                    'entities.risk.fields.likelihood',
                  )}
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
                  label={i18n(
                    'entities.risk.fields.impact',
                  )}
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
                  colors={
                    riskEnumerators.inherentScoreColor
                  }
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
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item md={4} xs={12}>
        <Grid height="100%" container>
          <Grid item xs={12} pb={1.6}>
            <Card sx={{ height: '100%' }}>
              <MDBox p={2.4}>
                <Grid container spacing={1.6}>
                  <Grid item xs={12}>
                    <MDTypography variant="h5">
                      {i18n('entities.risk.fields.tags')}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12}>
                    <TagAutocompleteFormItem
                      name="tags"
                      label={i18n(
                        'entities.risk.fields.tags',
                      )}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ height: '100%' }}>
              <MDBox p={2.4}>
                <Grid container spacing={1.6}>
                  <Grid item xs={12}>
                    <MDTypography variant="h5">
                      {i18n('entities.risk.fields.notes')}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12}>
                    <NoteAutocompleteFormItem
                      name="notes"
                      label={i18n(
                        'entities.risk.fields.notes',
                      )}
                      required={false}
                      showCreate={true}
                      mode="multiple"
                      variant="standard"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ height: '100%' }}>
          <MDBox p={2.4}>
            <Grid container spacing={1.6}>
              <Grid item xs={12}>
                <MDTypography variant="h5">
                  {i18n(
                    'entities.risk.fields.newsArticles',
                  )}
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <NewsArticleAutocompleteFormItem
                  name="newsArticles"
                  label={i18n(
                    'entities.risk.fields.newsArticles',
                  )}
                  mode="multiple"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ height: '100%' }}>
          <MDBox p={2.4}>
            <Grid container spacing={1.6}>
              <Grid item xs={12}>
                <MDTypography variant="h5">
                  {i18n('entities.risk.fields.products')}
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <ProductAutocompleteFormItem
                  name="products"
                  label={i18n(
                    'entities.risk.fields.products',
                  )}
                  mode="multiple"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ height: '100%' }}>
          <MDBox p={2.4}>
            <Grid container spacing={1.6}>
              <Grid item xs={12}>
                <MDTypography variant="h5">
                  {i18n(
                    'entities.risk.fields.policyTemplates',
                  )}
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <PolicyTemplateAutocompleteFormItem
                  name="policyTemplates"
                  label={i18n(
                    'entities.risk.fields.policyTemplates',
                  )}
                  mode="multiple"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ height: '100%' }}>
          <MDBox p={2.4}>
            <Grid container spacing={1.6}>
              <Grid item xs={12}>
                <MDTypography variant="h5">
                  {i18n('entities.risk.fields.policies')}
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <PolicyAutocompleteFormItem
                  name="policies"
                  label={i18n(
                    'entities.risk.fields.policies',
                  )}
                  mode="multiple"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <MDBox p={2.4}>
            <Grid container spacing={1.6}>
              <Grid item xs={12}>
                <MDTypography variant="h5">
                  {i18n('entities.risk.fields.attachments')}
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <FilesFormItem
                  name="attachments"
                  required={false}
                  storage={Storage.values.riskAttachments}
                  max={undefined}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <MDBox px={2.4} py={2.4}>
            <Grid container spacing={1.6}>
              <Grid item xs={12}>
                <MDTypography variant="h5">
                  Tasks
                </MDTypography>
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
        </Card>
      </Grid>
    </Grid>
  );
}

export default EditRiskLayout;
