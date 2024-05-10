import * as React from 'react';

export type IAction = {
    type: string;
    payload: any;
}

export interface ITable {
    header: string[];
    data: any[];
}
interface IState {
    tables: ITable[];
}
const initialState: IState = {
    tables: []
};
const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case 'UPDATE_TABLES':
            return { ...state, tables: [action.payload]};
        default:
            return state;
    }
};

export const TableContext = React.createContext<{
    tables: ITable[];
    setTableData: (data: ITable) => void;
} | null>(null);

const TableStore: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const setTableData = (data: ITable) => {
        dispatch({ type: 'UPDATE_TABLES', payload: data });
    };

    return (
        <TableContext.Provider value={{ tables: state.tables, setTableData }}>
            {children}
        </TableContext.Provider>
    );
};

export const useTableStore = () => React.useContext(TableContext);

export default TableStore;