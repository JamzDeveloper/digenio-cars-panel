import FormNewUser from "../../../../components/formNewUser";
import DashboardLayout from "../../../../layout/Dashboard";
import { Container,ContainerTittle } from "../../../../styles/style.user";
const NewUser = () => {
  return (
    <DashboardLayout>
      <Container>
      <ContainerTittle>
          <h2>New User</h2>

        </ContainerTittle>
      <FormNewUser  />
      </Container>
    </DashboardLayout>
  );
};

export default NewUser;
