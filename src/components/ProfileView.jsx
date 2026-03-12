import { useSelector } from "react-redux";
import ProfileEditor from "./ProfileEditor";

export default function ProfileView() {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <>
        <div>
          <ProfileEditor user={user} />
        </div>
      </>
    )
  );
}
