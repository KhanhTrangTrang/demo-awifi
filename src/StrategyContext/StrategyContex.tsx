import React, { createContext, useReducer, Dispatch, ReactNode } from "react"

// type date, action, state, context
export type Advertisement = {
    id: number
    nameAdvertisement: string;
    count: number;
    check?: boolean;
}
export type StrategyChild = {
    id: number;
    nameChild: string;
    active: boolean;
    advertisement: Advertisement[];
}
type StrategyState = {
    id: number;
    name: string;
    description: string;
    childs: StrategyChild[]
};

type StrategyAction =
    | { type: "name", name: string }
    | { type: "description", description: string }
    | { type: 'add-child' }
    | { type: 'update-child', child: StrategyChild };

type StrategyContextType = {
    state: StrategyState;
    dispatch: Dispatch<StrategyAction>;
};

const initialState: StrategyState = { 
    id: 1,
    name: '',
    description: '',
    childs: [{
        id: 1,
        active: true,
        nameChild: 'Chiến dịch con 1',
        advertisement: [{
            id: 1,
            count: 0,
            nameAdvertisement: 'Quảng cáo 1'
        }]
    }]
 };

export const StrategyContext = createContext<StrategyContextType>({
    state: initialState,
    dispatch: () => { },
});


// Provider
interface IStrategyProvider {
    children: ReactNode
}

export const StrategyProvider = ({ children }: IStrategyProvider) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value: StrategyContextType = { state, dispatch };
    return (
        <StrategyContext.Provider value={value}>
            {children}
        </StrategyContext.Provider>
    );
};


// reducer update state
function reducer(state: StrategyState, action: StrategyAction): StrategyState {
    switch (action.type) {
        case "name":
            return { ...state, name: action.name };
        case "description":
            return { ...state, description: action.description };
        case "add-child":
            const child: StrategyChild = {
                id: Math.max(...state.childs.map(o => o.id)) + 1 ?? 1,
                active: true,
                nameChild: `Chiến dịch con ${Math.max(...state.childs.map(o => o.id)) + 1 ?? 1}`,
                advertisement: [{
                    id: 1,
                    count: 0,
                    nameAdvertisement: `Quảng cáo 1`
                }]
            }
            state.childs.push(child);
            return {...state};
        case "update-child":
            const idx = state.childs.findIndex(val => val.id === action.child.id);
            state.childs[idx] = action.child;
            return {...state};
        default:
            throw new Error();
    }
}