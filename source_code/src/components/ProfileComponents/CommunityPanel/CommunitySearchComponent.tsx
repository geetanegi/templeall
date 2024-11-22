import { Search } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import apiService from "../../../services/apiService";
import { API_URL } from "../../../services/enums";
import PlayerCard from "./PlayerCard";
import { debounceFunc } from "../../../utils/debounce-utils";

interface CommunitySearchComponentProps {
  selectedUser: string | number;
  setSelectedUser: (userid: string | number) => void;
  setShowUserNotFound: (flag: boolean) => void;
}

const CommunitySearchComponent: React.FC<CommunitySearchComponentProps> = ({
  selectedUser,
  setSelectedUser,
  setShowUserNotFound,
}) => {
  const [searchString, setSearchString] = useState<string>("");
  const [playersList, setPlayerList] = useState<any>([]);

  useEffect(() => {
    getPlayer(searchString);
  }, []);

  useEffect(() => {
    if (playersList.length) {
      setSelectedUser(playersList?.[0].id);
    } else {
      setSelectedUser("");
    }
  }, [playersList]);

  const getPlayer = async (value?: string) => {
    setPlayerList([]);
    try {
      const payload = {
        username: value || searchString,
        firstName: value || searchString,
        lastName: value || searchString,
      };
      let payloadData = {};
      if (value) {
        payloadData = { data: { searchParams: payload } };
      } else {
        payloadData = {
          data: {
            pageSortingParam: {
              sortDir: "DESC",
              sortBy: "createdDate",
              pageNumber: "0",
              pageSize: "10",
            },
          },
        };
      }
      const { data, status } = await apiService.post<any>(
        API_URL.searchPlayer,
        payloadData,
      );
      if (status === 200 && data?.data != null && !data?.error) {
        setPlayerList(data?.data?.content || []);
        setShowUserNotFound(false);
      } else if (data?.error && data.description) {
        setSelectedUser("");
        setShowUserNotFound(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
    if (!searchString) {
      setSelectedUser("");
    }
  };

  // Debounce the getPlayer function
  // Debounce function, make sure it's created once
  const debouncedGetPlayer = useCallback(
    debounceFunc(
      (value: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange(value.target.value),
      1000,
    ),
    [],
  );
  const handleInputChange = (event: string) => {
    const value = event;
    setSearchString(value);
    getPlayer(value);
  };
  const scrollbarStyles: React.CSSProperties = {
    overflow: "auto", // Enable scrolling
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE and Edge
  };

  return (
    <div className="ml-5 h-[90vh] w-[25%]">
      <div className="align-center mt-5 flex w-full justify-center justify-between rounded-md border border-gray-300 bg-gray-100 px-4 py-2 md:mt-0 md:w-[242px]">
        <input
          className="w-full bg-gray-100 focus:outline-none"
          type="text"
          placeholder="Search Player"
          onChange={debouncedGetPlayer}
        />
        <Search
          size={20}
          color="gray"
          className="my-auto cursor-pointer"
          //   onClick={getPlayer}
        />
      </div>
      <div className="my-3 text-[20px] font-semibold tracking-wide text-primaryText">
        Community
      </div>
      <div className="h-[85vh]" style={scrollbarStyles}>
        {playersList?.map((profile: any) => (
          <PlayerCard
            profile={profile}
            isSelected={selectedUser == profile.id}
            setSelectedUser={setSelectedUser}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunitySearchComponent;
