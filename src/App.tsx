import { useState } from "react";

interface IParam {
  id: number;
  name: string;
  type: "string";
}

interface IParamValue {
  paramId: number;
  value: string;
}

interface IModel {
  paramValues: IParamValue[];
  colors: any[];
}

interface IProps {
  params: IParam[];
  model: IModel;
}

const ParamEditor: React.FC<IProps> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<IParamValue[]>(model.paramValues);

  const getModel = (): IModel => {
    return {
      ...model,
      paramValues,
    };
  };

  const handleParamChange = (paramId: number, value: string) => {
    setParamValues((prev) => prev.map((paramValue) => (paramValue.paramId === paramId ? { ...paramValue, value } : paramValue)));
  };

  return (
    <div>
      <h1>Редактор параметров</h1>
      {params.map((param) => {
        const paramValue = paramValues.find((value) => value.paramId === param.id)?.value || "";

        return (
          <div key={param.id}>
            <label>
              {param.name}:
              <input type="text" value={paramValue} onChange={(e) => handleParamChange(param.id, e.target.value)} />
            </label>
          </div>
        );
      })}
      <button onClick={() => console.log(getModel())}>Сохранить</button>
    </div>
  );
};

const App = () => {
  const params: IParam[] = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" },
  ];

  const model: IModel = {
    paramValues: [
      { paramId: 1, value: "повседневное" },
      { paramId: 2, value: "макси" },
    ],
    colors: [],
  };

  return <ParamEditor params={params} model={model} />;
};

export default App;
