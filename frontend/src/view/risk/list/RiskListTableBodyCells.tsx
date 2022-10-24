import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import RiskImpactViewItem from 'src/view/risk/view/RiskImpactViewItem';
import RiskInherentScoreViewItem from 'src/view/risk/view/RiskInherentScoreViewItem';
import RiskLikelihoodViewItem from 'src/view/risk/view/RiskLikelihoodViewItem';
import RiskStatusViewItem from 'src/view/risk/view/RiskStatusViewItem';
import RiskCategoryListItem from 'src/view/riskCategory/list/RiskCategoryListItem';
import TagListItem from 'src/view/tag/list/TagListItem';
import UserListItem from 'src/view/user/list/UserListItem';

function RiskListTableBodyCells(props) {
  const { row } = props;
  return (
    <>
      <DataTableBodyCell align="right">
        {row.reference}
      </DataTableBodyCell>
      <DataTableBodyCell>{row.title}</DataTableBodyCell>
      <DataTableBodyCell>
        <RiskStatusViewItem value={row.status} />
      </DataTableBodyCell>
      <DataTableBodyCell>
        <UserListItem value={row.owner} />
      </DataTableBodyCell>
      <DataTableBodyCell>
        <RiskCategoryListItem value={row.category} />
      </DataTableBodyCell>
      <DataTableBodyCell>
        <RiskLikelihoodViewItem value={row.likelihood} />
      </DataTableBodyCell>
      <DataTableBodyCell>
        <RiskImpactViewItem value={row.impact} />
      </DataTableBodyCell>
      <DataTableBodyCell>
        <RiskInherentScoreViewItem
          value={row.inherentScore}
        />
      </DataTableBodyCell>
      <DataTableBodyCell align="right">
        {row.residualScore}
      </DataTableBodyCell>
      <DataTableBodyCell align="right">
        {row.cost}
      </DataTableBodyCell>
      <DataTableBodyCell>
        <TagListItem value={row.tags} />
      </DataTableBodyCell>
    </>
  );
}

export default RiskListTableBodyCells;
