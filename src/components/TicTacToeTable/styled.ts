import styled from '@emotion/styled';
import { ITableItem, ITicTacToeTableInfo } from './types';
import { Modal } from 'antd';

export const Table = styled.div<ITicTacToeTableInfo>`
  display: grid;
  ${({ rowAndColumnAmount }) => `
     grid-template-rows: repeat(${rowAndColumnAmount}, 1fr);
     grid-template-columns: repeat(${rowAndColumnAmount}, 1fr);
  `}
  width: 700px;
  height: 700px;
  margin: 0 auto;
`;

export const TableItem = styled.div<ITableItem>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid black;
  font-size: ${({ rowAndColumnAmount }) => `${rowAndColumnAmount < 8 ? '80px' : '60px'}`};
  text-transform: uppercase;
  ${({ isWin }) => isWin && 'color: red;'}
`;

export const ModalBlock = styled(Modal)`
  & button:nth-of-type {
    display: none;
  }
`;

export const Score = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
`;

export const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
`;
