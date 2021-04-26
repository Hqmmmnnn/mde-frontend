import axios from "axios";
import { createEvent, createStore, Store, Event, sample, createEffect, Effect } from "effector";

export type CheckboxProps = {
  name: string;
  label: string;
  checked: boolean;
};

export type CheckboxDataFromServer = {
  id: number;
  name: string;
  note?: string;
};

export type CheckboxDataProps = {
  $checkboxes: Store<CheckboxProps[]>;
  checkedChanged: Event<string>;
};

export type CheckboxData = {
  lastStateRestored: Event<string[]>;
  dataFromServerLoaded: Effect<string, CheckboxDataFromServer[], Error>;
  checkedChanged: Event<string>;
  $checkboxes: Store<CheckboxProps[]>;
};

export const getCheckboxData = (initialState: CheckboxProps[]): CheckboxData => {
  const checkedChanged = createEvent<string>();
  const lastStateRestored = createEvent<string[]>();
  const dataFromServerLoaded = createEffect<string, CheckboxDataFromServer[], Error>(
    async (url) => {
      console.log("make request to server");
      const json = await axios.get<CheckboxDataFromServer[]>(url);
      return json.data;
    }
  );

  const $checkboxes = createStore<CheckboxProps[]>(initialState)
    .on(checkedChanged, (checkboxes, checkboxName) =>
      checkboxes.map((checkbox) => {
        return checkbox.name === checkboxName
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox;
      })
    )
    .on(dataFromServerLoaded.doneData, (_, payload) => {
      return payload.map((checkbox) => {
        console.log("data from server done");
        return {
          name: checkbox.name.replaceAll(" ", "_"),
          label: checkbox.name,
          checked: false,
        };
      });
    })
    .on(lastStateRestored, (state, payload) => {
      return state.map((checkbox) => {
        console.log("loadStateRestored");
        if (payload.includes(checkbox.name)) {
          return { ...checkbox, checked: true };
        }

        return checkbox;
      });
    });

  return {
    lastStateRestored,
    dataFromServerLoaded,
    checkedChanged,
    $checkboxes,
  };
};

export type CheckboxWithSearchData = {
  lastStateRestored: Event<string[]>;
  dataFromServerLoaded: Effect<string, CheckboxDataFromServer[], Error>;
  checkboxesFiltered: Event<string>;
  checkedChanged: Event<string>;
  $checkboxes: Store<CheckboxProps[]>;
  $filteredCheckboxes: Store<CheckboxProps[]>;
};

export type CheckboxWithSearchDataProps = {
  checkboxesFiltered: Event<string>;
  checkedChanged: Event<string>;
  $filteredCheckboxes: Store<CheckboxProps[]>;
};

export const getCheckboxWithSearchData = (
  initialState: CheckboxProps[]
): CheckboxWithSearchData => {
  const checkboxesFiltered = createEvent<string>();
  const checkedChanged = createEvent<string>();
  const lastStateRestored = createEvent<string[]>();
  const dataFromServerLoaded = createEffect<string, CheckboxDataFromServer[], Error>(
    async (url) => {
      console.log("make request to server");
      const json = await axios.get<CheckboxDataFromServer[]>(url);
      return json.data;
    }
  );

  const $checkboxes = createStore<CheckboxProps[]>(initialState)
    .on(checkedChanged, (checkboxes, id) =>
      checkboxes.map((checkbox) => {
        return checkbox.name === id ? { ...checkbox, checked: !checkbox.checked } : checkbox;
      })
    )
    .on(dataFromServerLoaded.doneData, (_, payload) => {
      return payload.map((checkbox) => {
        console.log("manufacturers");
        console.log(checkbox);
        const obj: CheckboxProps = {
          name: checkbox.name.replaceAll(" ", "_"),
          label: checkbox.name,
          checked: false,
        };
        console.log("edited man " + obj.name + " " + obj.label);
        return obj;
      });
    })
    .on(lastStateRestored, (state, payload) => {
      return state.map((checkbox) => {
        console.log("loadStateRestored");
        if (payload.includes(checkbox.name)) {
          return { ...checkbox, checked: true };
        }

        return checkbox;
      });
    });

  const $filteredCheckboxes = createStore<CheckboxProps[]>(initialState)
    .on(checkedChanged, (checkboxes, checkboxName) =>
      checkboxes.map((checkbox) => {
        return checkbox.name === checkboxName
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox;
      })
    )
    .on(dataFromServerLoaded.doneData, (_, payload) => {
      return payload.map((checkbox) => {
        console.log("manufacturers");
        console.log(checkbox);
        const obj: CheckboxProps = {
          name: checkbox.name.replaceAll(" ", "_"),
          label: checkbox.name,
          checked: false,
        };
        console.log("edited man " + obj.name + " " + obj.label);
        return obj;
      });
    })
    .on(lastStateRestored, (state, payload) => {
      return state.map((checkbox) => {
        console.log("loadStateRestored");
        if (payload.includes(checkbox.name)) {
          return { ...checkbox, checked: true };
        }

        return checkbox;
      });
    });

  sample({
    clock: checkboxesFiltered,
    source: $checkboxes,
    fn: (checkboxes, inputValue) =>
      checkboxes.filter((c) => c.label.toLowerCase().startsWith(inputValue)),
    target: $filteredCheckboxes,
  });

  return {
    lastStateRestored,
    dataFromServerLoaded,
    checkboxesFiltered,
    checkedChanged,
    $checkboxes,
    $filteredCheckboxes,
  };
};
