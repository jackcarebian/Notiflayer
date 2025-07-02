type Props = {
  params: {
    outlet: string;
  };
};

export default function RegistrationPage({ params }: Props) {
  return (
    <div>
      <h1>Register for Outlet: {params.outlet}</h1>
      <p>Registration form will be here.</p>
    </div>
  );
}
