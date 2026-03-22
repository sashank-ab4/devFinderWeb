import axios from "axios";
import { BASE_BACKEND_URL } from "../utils/mockData";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import FeedUserCard from "./FeedUserCard";
import { Link } from "react-router-dom";

export default function Feed() {
  //updater function
  const feedUpdater = useDispatch();
  // subscribing to the store!
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_BACKEND_URL + "/feed", {
        withCredentials: true,
      });

      feedUpdater(addFeed(res?.data?.data));
    } catch (err) {
      console.err(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length <= 0)
    return (
      <h1 className="text-center font-mono ">
        Refresh the Feed to find more Users!
      </h1>
    );
  return (
    <>
      {feed && (
        <div className="flex justify-center my-10">
          <span className="text-2xl md:text-3xl font-semibold tracking-wide text-center">
            The Hub for{" "}
            <span className="text-rotate">
              <span>
                <span className="bg-teal-400 text-teal-900 px-2 rounded">
                  Designers
                </span>
                <span className="bg-red-400 text-red-900 px-2 rounded">
                  Developers
                </span>
                <span className="bg-blue-400 text-blue-900 px-2 rounded">
                  Creators
                </span>
                <span className="bg-teal-400 text-teal-900 px-2 rounded">
                  Builders
                </span>
                <span className="bg-red-400 text-red-900 px-2 rounded">
                  Coders
                </span>
                <span className="bg-blue-400 text-blue-900 px-2 rounded">
                  Dreamers
                </span>
              </span>
            </span>
          </span>
        </div>
      )}
      {feed && (
        <div className="flex justify-center my-12">
          <FeedUserCard user={feed[0]} />
        </div>
      )}
    </>
  );
}
