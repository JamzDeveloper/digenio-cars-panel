import FormNewProduct from "../../../../components/formNewProduct";
import DashboardLayout from "../../../../layout/Dashboard";
import { Container } from "../../../../styles/style.products";
const NewProduct = () => {
  return (
    <DashboardLayout>
      <Container>
          <FormNewProduct/>
      </Container>
    </DashboardLayout>
  );
};

export default NewProduct;
