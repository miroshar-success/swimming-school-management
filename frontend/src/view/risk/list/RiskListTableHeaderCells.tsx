import { i18n } from 'src/i18n';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';

function RiskListTableHeaderCells(props) {
  const { sorter, doChangeSort } = props;
  return (
    <>
      <DataTableHeadCell
        onClick={() => doChangeSort('reference')}
        sorted={
          sorter.field === 'reference'
            ? sorter.order
            : 'none'
        }
      >
        {i18n('entities.risk.fields.reference')}
      </DataTableHeadCell>
      <DataTableHeadCell
        onClick={() => doChangeSort('title')}
        sorted={
          sorter.field === 'title' ? sorter.order : 'none'
        }
      >
        {i18n('entities.risk.fields.title')}
      </DataTableHeadCell>
      <DataTableHeadCell
        onClick={() => doChangeSort('status')}
        sorted={
          sorter.field === 'status' ? sorter.order : 'none'
        }
      >
        {i18n('entities.risk.fields.status')}
      </DataTableHeadCell>
      <DataTableHeadCell sorted={false}>
        {i18n('entities.risk.fields.owner')}
      </DataTableHeadCell>
      <DataTableHeadCell sorted={false}>
        {i18n('entities.risk.fields.category')}
      </DataTableHeadCell>
      <DataTableHeadCell
        onClick={() => doChangeSort('likelihood')}
        sorted={
          sorter.field === 'likelihood'
            ? sorter.order
            : 'none'
        }
      >
        {i18n('entities.risk.fields.likelihood')}
      </DataTableHeadCell>
      <DataTableHeadCell
        onClick={() => doChangeSort('impact')}
        sorted={
          sorter.field === 'impact' ? sorter.order : 'none'
        }
      >
        {i18n('entities.risk.fields.impact')}
      </DataTableHeadCell>
      <DataTableHeadCell
        onClick={() => doChangeSort('inherentScore')}
        sorted={
          sorter.field === 'inherentScore'
            ? sorter.order
            : 'none'
        }
      >
        {i18n('entities.risk.fields.inherentScore')}
      </DataTableHeadCell>
      <DataTableHeadCell
        onClick={() => doChangeSort('residualScore')}
        sorted={
          sorter.field === 'residualScore'
            ? sorter.order
            : 'none'
        }
      >
        {i18n('entities.risk.fields.residualScore')}
      </DataTableHeadCell>
      <DataTableHeadCell
        onClick={() => doChangeSort('cost')}
        sorted={
          sorter.field === 'cost' ? sorter.order : 'none'
        }
      >
        {i18n('entities.risk.fields.cost')}
      </DataTableHeadCell>
      <DataTableHeadCell sorted={false}>
        {i18n('entities.risk.fields.tags')}
      </DataTableHeadCell>
    </>
  );
}

export default RiskListTableHeaderCells;
