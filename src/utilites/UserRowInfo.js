// // 2. Reusable Info Row Component
export const UserInfoRow = ({ icon, label, value }) => {
  if (!value) return null;
  return (
    <p className="text-sm text-gray-500 mt-1">
      {icon} <span className="font-medium">{label}:</span>{" "}
      <span className="select-all">{value}</span>
    </p>
  );
};
