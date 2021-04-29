import { AppBar, makeStyles, Modal, Tab, Tabs, Theme } from "@material-ui/core";
import { useStore } from "effector-react";
import { LoginModal } from "./login";
import { $currentTabIndex, $isAuthModalOpen, authModalClosed, tabIndexChanged } from "./auth-model";
import { RegisterModal } from "./register";

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  appbar: {
    position: "inherit",
    borderRadius: "15px 15px 0 0",
  },
}));

const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
  tabIndexChanged(newValue);
};

export const AuthTabs = () => {
  const classes = useStyles();

  const index = useStore($currentTabIndex);
  const isOpen = useStore($isAuthModalOpen);

  return (
    <Modal open={isOpen} onClose={() => authModalClosed()} className={classes.modal}>
      <div>
        <AppBar className={classes.appbar}>
          <Tabs value={index} onChange={handleChange} centered>
            <Tab label="Войти" />
            <Tab label="Зарегистрироваться" />
          </Tabs>
        </AppBar>

        <AuthTab value={index} index={0}>
          <LoginModal />
        </AuthTab>
        <AuthTab value={index} index={1}>
          <RegisterModal />
        </AuthTab>
      </div>
    </Modal>
  );
};

type TabPanelProps = {
  children?: React.ReactNode;
  index: any;
  value: any;
};

const AuthTab = (props: TabPanelProps) => {
  const { children, index, value, ...other } = props;

  return (
    <div
      style={{ backgroundColor: "#fff", borderRadius: "0 0 15px 15px" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};
