import axios from "axios";
import { BASE_BACKEND_URL } from "../utils/mockData";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import FeedUserCard from "./FeedUserCard";

export default function Feed() {
  //upater function
  const feedUpdater = useDispatch();
  // subscribing to the store!
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_BACKEND_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res);
      feedUpdater(addFeed(res?.data?.data));
    } catch (err) {
      console.err(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  return (
    feed && (
      <div className="flex justify-center my-12">
        <FeedUserCard user={feed[3]} />
      </div>
    )
  );
}
