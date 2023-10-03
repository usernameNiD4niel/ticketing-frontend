import UpdatePasswordForm from "../client/accounts/UpdatePasswordForm";

type UpdatePasswordProps = {
  token: string;
  email: string;
};

const UpdatePassword: React.FC<UpdatePasswordProps> = ({ token, email }) => {
  return (
    <div className="flex justify-center items-center">
      <UpdatePasswordForm token={token} email={email} />
    </div>
  );
};

export default UpdatePassword;
