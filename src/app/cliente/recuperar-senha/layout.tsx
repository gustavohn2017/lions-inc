export default function RecuperarSenhaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="login-container">
      {children}
    </div>
  );
}
