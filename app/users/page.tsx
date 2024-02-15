import { getAllUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/Card/UserCard";

async function UserPage() {
  const users = await getAllUsers();
  return (
    <div className="wfu px-4 md:px-8">
      <div>
        <h2 className="mb-4 text-4xl font-bold">Users</h2>
      </div>
      <div className="grid place-items-center justify-items-stretch gap-2 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {users.map((user: any) => (
          <div key={user._id.toString()}>
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPage;
