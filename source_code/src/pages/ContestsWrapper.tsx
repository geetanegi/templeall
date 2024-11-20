import { useLocation } from "react-router-dom";
import ContestManagement from "../components/Contests/ContestManagement";
import CreateContest from "./CreateContest";
import Contests from "./Contests";

const ContestsWrapper = () => {
  const location = useLocation();
  const state = location.state as string;

  if (state === "CREATE_CONTEST") {
    return <CreateContest />;
  }

  if (state === "UPDATE_CONTEST") {
    return <Contests />;
  }

  return <ContestManagement />;
};

export default ContestsWrapper;
