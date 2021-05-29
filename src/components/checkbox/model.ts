import axios from "axios";
import { createEvent, createStore, Store, Event, sample, createEffect, Effect } from "effector";

export type CheckboxValue = {
  name: string;
  label: string;
  checked: boolean;
};

type CheckboxDataFromServer = {
  id: number;
  name: string;
  note?: string;
};

export type CheckboxDataProps = {
  $checkboxes: Store<CheckboxValue[]>;
  checkedChanged: Event<string>;
};

export type CheckboxData = {
  lastStateRestored: Event<string[]>;
  dataFromServerLoaded: Effect<string, CheckboxDataFromServer[], Error>;
  checkedChanged: Event<string>;
  $checkboxes: Store<CheckboxValue[]>;
};

export const getCheckboxData = (initialState: CheckboxValue[]): CheckboxData => {
  const checkedChanged = createEvent<string>();
  const lastStateRestored = createEvent<string[]>();
  const dataFromServerLoaded = createEffect<string, CheckboxDataFromServer[], Error>(
    async (url) => {
      const json = await axios.get<CheckboxDataFromServer[]>(url);
      return json.data;
    }
  );

  const $checkboxes = createStore<CheckboxValue[]>(initialState)
    .on(checkedChanged, (checkboxes, checkboxName) =>
      checkboxes.map((checkbox) => {
        return checkbox.name === checkboxName
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox;
      })
    )
    .on(dataFromServerLoaded.doneData, (_, payload) => {
      return payload.map((checkbox) => {
        return {
          name: checkbox.name.replaceAll(" ", "_"),
          label: checkbox.name,
          checked: false,
        };
      });
    })
    .on(lastStateRestored, (state, payload) => {
      return state.map((checkbox) => {
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
  $value: Store<string>;
  reset: Event<void>;
  lastStateRestored: Event<string[]>;
  dataFromServerLoaded: Effect<string, CheckboxDataFromServer[], Error>;
  checkboxesFiltered: Event<string>;
  checkedChanged: Event<string>;
  $checkboxes: Store<CheckboxValue[]>;
  $filteredCheckboxes: Store<CheckboxValue[]>;
};

export type CheckboxWithSearchDataProps = {
  value: string;
  checkboxesFiltered: Event<string>;
  checkedChanged: Event<string>;
  $filteredCheckboxes: Store<CheckboxValue[]>;
  placeholder: string;
};

export const getCheckboxWithSearchData = (
  initialState: CheckboxValue[]
): CheckboxWithSearchData => {
  const checkboxReseted = createEvent<void>();
  const checkboxesFiltered = createEvent<string>();
  const checkedChanged = createEvent<string>();
  const lastStateRestored = createEvent<string[]>();
  const dataFromServerLoaded = createEffect<string, CheckboxDataFromServer[], Error>(
    async (url) => {
      const json = await axios.get<CheckboxDataFromServer[]>(url);
      return json.data;
    }
  );

  const $value = createStore<string>("")
    .on(checkboxesFiltered, (_, payload) => payload)
    .reset(checkboxReseted);

  const $checkboxes = createStore<CheckboxValue[]>(initialState)
    .on(checkedChanged, (checkboxes, id) =>
      checkboxes.map((checkbox) => {
        return checkbox.name === id ? { ...checkbox, checked: !checkbox.checked } : checkbox;
      })
    )
    .on(dataFromServerLoaded.doneData, (_, payload) => {
      return payload.map((checkbox) => ({
        name: checkbox.name.replaceAll(" ", "_"),
        label: checkbox.name,
        checked: false,
      }));
    })
    .on(lastStateRestored, (state, payload) => {
      return state.map((checkbox) => {
        if (payload.includes(checkbox.name)) {
          return { ...checkbox, checked: true };
        }

        return checkbox;
      });
    });

  const $filteredCheckboxes = createStore<CheckboxValue[]>(initialState)
    .on(checkedChanged, (checkboxes, checkboxName) =>
      checkboxes.map((checkbox) => {
        return checkbox.name === checkboxName
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox;
      })
    )
    .on(dataFromServerLoaded.doneData, (_, payload) => {
      return payload.map((checkbox) => ({
        name: checkbox.name.replaceAll(" ", "_"),
        label: checkbox.name,
        checked: false,
      }));
    })
    .on(lastStateRestored, (state, payload) => {
      return state.map((checkbox) => {
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
    $value,
    reset: checkboxReseted,
    lastStateRestored,
    dataFromServerLoaded,
    checkboxesFiltered,
    checkedChanged,
    $checkboxes,
    $filteredCheckboxes,
  };
};
