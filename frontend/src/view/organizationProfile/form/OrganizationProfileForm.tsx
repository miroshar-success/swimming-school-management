import { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Grid,
  Card,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import AboutSection from 'src/view/organizationProfile/form/components/About';
import ComplianceSection from 'src/view/organizationProfile/form/components/Compliance';
import TechnologySection from 'src/view/organizationProfile/form/components/Technology';
import SecurityProgramSection from 'src/view/organizationProfile/form/components/SecurityProgram';
import MDBox from 'src/mui/components/MDBox';
import validations from 'src/view/organizationProfile/form/schemas/validations';
import GradientTitle from 'src/view/shared/components/GradientTitle';

function OrganizationProfileForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      companyName: record.companyName,
      industry: record.industry,
      employee: record.employee,
      thirdParties: record.thirdParties,
      location: record.location,
      regulatoryCompliance:
        record.regulatoryCompliance || [],
      technologyStack: record.technologyStack,
      outsourcedIT: record.outsourcedIT,
      outsourcedSecurityOperations:
        record.outsourcedSecurityOperations,
      pastIncidents: record.pastIncidents,
      cspSecurityPolicies: record.cspSecurityPolicies,
      cspListITAssets: record.cspListITAssets,
      cspJobRoleInfoSecTraining:
        record.cspJobRoleInfoSecTraining,
      cspIncidentMgmtPlan: record.cspIncidentMgmtPlan,
      cspIncidentVendorNotification:
        record.cspIncidentVendorNotification,
      cspCyberInsurance: record.cspCyberInsurance,
      cspLatestCyberAwarenessThreats:
        record.cspLatestCyberAwarenessThreats,
      cspMFAUtilized: record.cspMFAUtilized,
      cspSecurityTesting: record.cspSecurityTesting,
      cspBackupStrategy: record.cspBackupStrategy,
    };
  });

  const getSteps = (): string[] => {
    return [
      i18n('entities.organizationProfile.sections.about'),
      i18n(
        'entities.organizationProfile.sections.compliance',
      ),
      i18n(
        'entities.organizationProfile.sections.technology',
      ),
      i18n(
        'entities.organizationProfile.sections.securityProgram',
      ),
    ];
  };

  const steps = getSteps();
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;
  const currentValidation = validations[activeStep];

  const form = useForm({
    resolver: yupResolver(currentValidation),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    if (isLastStep) {
      props.onSubmit(props.record?.id, values);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => setActiveStep(activeStep - 1);

  const { saveLoading, modal } = props;

  return (
    <Grid item xs={12} lg={8}>
      <FormWrapper>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete="off"
            noValidate
          >
            <Card sx={{ height: '100%' }}>
              <MDBox mx={1.6}>
                <GradientTitle>
                  <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </GradientTitle>
              </MDBox>
              <MDBox p={2.4}>
                <MDBox>
                  <AboutSection
                    visible={activeStep === 0}
                  />
                  <ComplianceSection
                    visible={activeStep === 1}
                  />
                  <TechnologySection
                    visible={activeStep === 2}
                  />
                  <SecurityProgramSection
                    visible={activeStep === 3}
                  />
                  <MDBox
                    mt={1.6}
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                  >
                    {activeStep === 0 ? (
                      <MDBox />
                    ) : (
                      <MDButton
                        variant="outlined"
                        color={sidenavColor}
                        onClick={handleBack}
                      >
                        back
                      </MDButton>
                    )}
                    <MDButton
                      type="submit"
                      variant="gradient"
                      color={sidenavColor}
                    >
                      {isLastStep ? 'send' : 'next'}
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </form>
        </FormProvider>
      </FormWrapper>
    </Grid>
  );
}

export default OrganizationProfileForm;
