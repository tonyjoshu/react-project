const { useNavigate } = require("react-router-dom");

const useAdminProfile = () => {
  let navigate = useNavigate();
  const handleBack = () => navigate(-1);
  return { handleBack };
};

export default useAdminProfile;
