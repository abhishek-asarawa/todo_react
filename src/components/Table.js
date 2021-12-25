import React from 'react';
import map from 'lodash/map';
import { Table } from 'semantic-ui-react';
import timeConvertor from '../helpers/timeConvertor';

const getNestedValue = (obj, path) => {
  const [first, ...rest] = path.split('.');
  const data = obj[first];
  if (rest.length === 0) return data;
  return getNestedValue(data, rest.join('.'));
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
                <Table.HeaderCell key="tasks" colSpan="3" textAlign="center">
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
            >
              {map([...columns[0], ...columns[1]], (cell, col_index) => {
                return (
                  <Table.Cell
                    key={`${col_index}_${index}`}
                    textAlign={cell.textAlign ? cell.textAlign : 'left'}
                  >
                    {cell.type === 'timestamp'
                      ? timeConvertor(getNestedValue(row, cell.id))
                      : getNestedValue(row, cell.id)}
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
