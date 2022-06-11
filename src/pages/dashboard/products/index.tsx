import { useRouter } from "next/router";
import DashboardLayout from "../../../layout/Dashboard";
import ProductTable from "../../../components/productTable";
import { ALLPRODUCTS } from "../../../graphql/query/query.products";
import { ProductsDataContext } from "../../../context/productsContext";
import { useEffect, useContext, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Product } from "../../../models/ProductType";
import { Container, ContainerActions } from "../../../styles/style.products";
import { Button, Grid, Input } from "@nextui-org/react";
import Add from "../../../assets/svg-components/add";
import SearchIcon from "../../../assets/svg-components/Search";
import Loading from "../../../components/loading";
import SelectFilter from "../../../components/selectFilter/index";

type AllProducts = {
  data: {
    allProductForAdmin: Product[];
  };
};
const ProductPage = () => {
  const router = useRouter();
  const routerActual = router.pathname.split("/")[2];

  const [search, setSearch] = useState("");
  const [valueFilter, setValueFilter] = useState("ALL");

  const [allProduct, setAllProduct] = useState<Product[]>([]);
  const { productsData, updateDataProducts } = useContext(ProductsDataContext);
  const [getProducts, { data, loading, error }] =
    useLazyQuery<AllProducts>(ALLPRODUCTS);

  useEffect(() => {
    if (productsData.length === 0) {
      getProducts().then((response: any) => {
        if (response.data?.allProductForAdmin) {
          updateDataProducts(response.data!.allProductForAdmin);
        }
      });
    }
    setAllProduct(productsData);
  }, [getProducts, updateDataProducts, productsData]);

  useEffect(() => {
    if (search == "" && valueFilter == "ALL") {
      setAllProduct(productsData);
    }

    if (search !== "" && search !== undefined && valueFilter == "ALL") {
      let allProduct: Product[] = productsData.filter((product) => {
        return product.name!.toLowerCase().includes(search.toLowerCase());
      });

      setAllProduct(allProduct);
    }

    if (valueFilter !== "ALL" && search != "") {
      let allProduct: Product[] = productsData.filter((product) => {
        return (
          product.name!.toLowerCase().includes(search!.toLowerCase()) &&
          product.saleStatus == valueFilter
        );
      });
      setAllProduct(allProduct);
    }

    if (valueFilter !== "ALL" && valueFilter !== undefined && search == "") {
      let allProduct: Product[] = productsData.filter((productsData) => {
        return productsData.saleStatus === valueFilter;
      });
      setAllProduct(allProduct);
    }
  }, [allProduct, productsData, search, valueFilter]);

  const onclickAdd = () => {
    router.push("/dashboard/products/new-product");
  };

  return (
    <DashboardLayout routeActual={routerActual}>
      <Container>
        <ContainerActions>
          <Grid>
            <Input
              aria-label="Search"
              size="lg"
              width="400px"
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              contentRight={
                <SearchIcon
                  style={{ overflow: "hidden", cursor: "pointer" }}
                ></SearchIcon>
              }
            />
          </Grid>
          <SelectFilter
            setValueFilter={setValueFilter}
            valueInitial="ALL"
            options={["ALL", "SOLD", "AVAILABLE"]}
          />
          <Button icon={<Add color="#ffffff" />} onClick={onclickAdd}>
            Add Product
          </Button>
        </ContainerActions>
        {loading ? <Loading /> : <ProductTable data={allProduct} />}
      </Container>
    </DashboardLayout>
  );
};
export default ProductPage;
