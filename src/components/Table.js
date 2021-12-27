import React from 'react';
import map from 'lodash/map';
import { Table } from 'semantic-ui-react';
import timeConvertor from '../helpers/timeConvertor';
import timeDiffToStr from '../helpers/timeDifference';

const getNestedValue = (obj, path) => {
  const [first, ...rest] = path.split('.');
  const data = obj[first];
  if (rest.length === 0) return data;
  return getNestedValue(data, rest.join('.'));
};

const getCellValue = (row, cell) => {
  const value = getNestedValue(row, cell.id);
  switch (cell.type) {
    case 'timestamp':
      return timeConvertor(value);

    case 'timeDiff':
      return timeDiffToStr(value);

    default:
      return value;
  }
};

const BoardTable = ({ columns, rows, rowWithClickEvent, handleClick }) => {
  return (
    <Table celled structured striped selectable>
      <Table.Header>
        {map(columns, (col, index) => {
          return (
            <Table.Row key={`header_${index}`}>
              {map(col, (cell) => (
                <Table.HeaderCell
                  key={cell.id}
                  rowSpan="2"
                  textAlign={cell.textAlign ? cell.textAlign : 'left'}
                >
                  {cell.name}
                </Table.HeaderCell>
              ))}
              {index === 0 && (
                <Table.HeaderCell
                  key="tasks"
                  colSpan="3"
                  textAlign="center"
                  width={8}
                >
                  Tasks
                </Table.HeaderCell>
              )}
            </Table.Row>
          );
        })}
      </Table.Header>

      <Table.Body>
        {map(rows, (row, index) => {
          return (
            <Table.Row
              key={`row_${index}`}
              onClick={rowWithClickEvent ? () => handleClick(row.id) : () => {}}
              style={rowWithClickEvent ? { cursor: 'pointer' } : {}}
            >
              {map([...columns[0], ...columns[1]], (cell, col_index) => {
                return (
                  <Table.Cell
                    key={`${col_index}_${index}`}
                    textAlign={cell.textAlign ? cell.textAlign : 'left'}
                  >
                    {getCellValue(row, cell)}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default BoardTable;
