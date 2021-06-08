export const mapRole = (role: string) => {
  let formatedRole;

  switch (role) {
    case "ADMIN":
      formatedRole = "Администратор";
      break;

    case "EDITOR":
      formatedRole = "Редактор";
      break;

    case "PREEDITOR":
      formatedRole = "Редактор 2";
      break;

    case "READER":
      formatedRole = "Читатель";
      break;

    default:
      formatedRole = "Отображение роли не задано";
  }

  return formatedRole;
};
