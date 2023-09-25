import UpdatePasswordForm from "../client/accounts/UpdatePasswordForm";

type UpdatePasswordProps = {
  token?: string;
};

const UpdatePassword: React.FC<UpdatePasswordProps> = ({ token }) => {
  return (
    <div className="flex justify-center items-center">
      <UpdatePasswordForm token={token} />
    </div>
  );
};

export default UpdatePassword;
