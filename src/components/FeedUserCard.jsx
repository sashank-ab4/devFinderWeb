export default function FeedUserCard({ user }) {
  const { firstName, lastName, age, about, gender } = user;
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
      <div className="h-60 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={
            user.photoUrl ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="profile"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="p-6 text-center space-y-3">
        <h2 className="text-xl font-semibold">
          {firstName} {lastName}
        </h2>

        {user.age && user.gender && (
          <p className="text-gray-500">
            {age}, {gender}
          </p>
        )}

        <p className="text-gray-600">{about}</p>

        <div className="flex justify-center gap-4 pt-3">
          <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
            Ignore
          </button>

          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}
