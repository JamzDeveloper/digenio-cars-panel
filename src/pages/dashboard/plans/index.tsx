import { useRouter, Router } from "next/router";
import CardPlan from "../../../components/cardPlan";
import LayoutDashboard from "../../../layout/Dashboard";
import {
  ContainerPlans,
  ContainerActions,
  Container,
} from "../../../styles/style.plan";
import { ALLPLANS } from "../../../graphql/query/query.plan";
import { useLazyQuery, useMutation } from "@apollo/client";

import { useContext, useEffect, useState } from "react";
import { Plan } from "../../../models/Plan";
import { Button, Grid, Input } from "@nextui-org/react";
import Add from "../../../assets/svg-components/add";
import SearchIcon from "../../../assets/svg-components/Search";
import Loading from "../../../components/loading";
import {
  CREATEPLAN,
  DELETEPLAN,
  TOGGLEPLAN,
  UPDATEPLAN,
} from "../../../graphql/mutation/mutation.plan";
import ModalPlan from "../../../components/modalPlan";
import { FileType } from "../../../models/Types";
import { getCookie, removeCookie, setCookie } from "../../../helpers/cookie";
import { redirect } from "../../../helpers/function";
import { UserDataContext } from "../../../context/userData";
import { LOGIN } from "../../../graphql/query/query.login";

const PlansPage = ({ token }: { token: string }) => {
  const router = useRouter();
  const routerActual = router.pathname.split("/")[2];
  const [visibleModal, setVisibleModal] = useState(false);

  //create plan
  const [createPlan] = useMutation(CREATEPLAN);
  const [imageProcessing, setImageProcessing] = useState<FileType>(
    {} as FileType
  );
  const [planData, setPlanData] = useState<Plan>({
    featured_products: false,
  } as Plan);

  //update plan

  const [updatePlan] = useMutation(UPDATEPLAN);
  const [isEdit, setIsEdit] = useState(false);

  const [updateData, setUpdateData] = useState<boolean>(false);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [deletePlan] = useMutation(DELETEPLAN);
  const [togglePlan] = useMutation(TOGGLEPLAN);
  const [getPlans, { loading, error, data }] = useLazyQuery(ALLPLANS);
  const { updateDataUser } = useContext(UserDataContext);
  const [getLogin] = useLazyQuery(LOGIN);

  useEffect(() => {
    if (token) {
      getLogin({ variables: { username: "", password: "" } })
        .then((response) => {
          if (response.data) {
            setCookie("token", response.data.login.token);
            updateDataUser(response.data.login.user);
          }
        })
        .catch((e) => {
          removeCookie("token");
          router.push("/login");
        });
    }else{
      router.push("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLogin, token]);

  useEffect(() => {
    getPlans().then((response: any) => {
      if (response.data) {
        setPlans(response.data.plans);
      }
    });
  }, [getPlans, deletePlan, updateData]);

  const onClickDeletePlan = async (planId: string) => {
    const resp = await deletePlan({
      variables: {
        deletePlanId: planId,
      },
    });
    if (resp.data.deletePlan) {
      const newPlans = plans.filter((plan) => plan._id !== planId);
      setPlans(newPlans);
    }
  };

  const onClickEditPlan = (plan: Plan) => {
    // setEditPlan(plan);
    setIsEdit(true);

    setPlanData(plan);

    if (plan.image) {
      setImageProcessing({
        profileImg: `${process.env.NEXT_PUBLIC_URL}/images/${plan.image}`,
      });
    }
    setVisibleModal(true);
  };
  const onClickTogglePlan = async (planId: string) => {
    const resp = await togglePlan({
      variables: {
        togglePlanId: planId,
      },
    });
    if (resp.data.togglePlan) {
      const newPlans = plans.map((plan) => {
        if (plan._id === planId) {
          return resp.data.togglePlan;
        }
        return plan;
      });
      setPlans(newPlans);
    }
  };
  const onChangesearch = (e: any) => {
    const newData = data.plans.filter((item: Plan) =>
      item!.name?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (e.target.value === "") {
      setPlans(data.plans);
    } else {
      setPlans(newData);
    }
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    isEdit ? updatePlanSubmit() : createPlanSubmit();
  };

  const createPlanSubmit = async () => {
    try {
      const resp = await createPlan({
        variables: {
          data: {
            ...planData,
          },
          file: imageProcessing.file,
        },
      });
      if (resp.data.createPlan) {
        setPlanData({
          credits: 0,
          plan_time: 0,
          price: {
            value: 0,
          },
          featured_products: false,
        } as Plan);

        alert("Plan creado");
        setUpdateData(!updateData);
      }
    } catch (e) {
      alert("Error al crear el plan");
    }
  };
  const updatePlanSubmit = async () => {
    try {
      const { _id, image, state, __typename, ...rest } = planData as any;

      const data = {
        ...rest,
        price: {
          value: rest.price.value,
          currency: rest.price.currency,
        },
      };

      let resp: any;
      if (imageProcessing?.file) {
        resp = await updatePlan({
          variables: {
            updatePlanId: _id,
            data: data,
            file: imageProcessing.file,
          },
        });
      }
      if (
        (!imageProcessing.file || imageProcessing.file == null) &&
        imageProcessing.profileImg
      ) {
        resp = await updatePlan({
          variables: {
            updatePlanId: _id,
            data: data,
          },
        });
      }
      if (
        (!imageProcessing.file || imageProcessing.file == null) &&
        (!imageProcessing.profileImg || imageProcessing.profileImg == null)
      ) {
        resp = await updatePlan({
          variables: {
            updatePlanId: _id,
            data: data,
            image: null,
          },
        });
      }

      if (resp.data.updatePlan) {
        alert("Plan actualizado");
        setUpdateData(!updateData);
        //  setIsEdit(false);
        //  setVisibleModal(false);
      }
    } catch (e) {
      alert("Error al actualizar el plan");
    }
  };
  return (
    <>
      <LayoutDashboard routeActual={routerActual}>
        <Container>
          <ContainerActions>
            <Grid>
              <Input
                aria-label="Search"
                size="lg"
                width="400px"
                type="text"
                placeholder="Search"
                onChange={onChangesearch}
                contentRight={
                  <SearchIcon
                    style={{ overflow: "hidden", cursor: "pointer" }}
                  ></SearchIcon>
                }
              />
            </Grid>
            <Button
              icon={<Add color="#ffffff" />}
              onClick={() => {
                setPlanData({
                  featured_products: false,
                } as Plan);
                setVisibleModal(!visibleModal);
              }}
            >
              Add Plan
            </Button>
          </ContainerActions>
          {loading ? (
            <Loading />
          ) : (
            <ContainerPlans>
              {plans.map((plan: Plan, i) => (
                <CardPlan
                  key={i}
                  toggleActive={onClickTogglePlan}
                  deletePlan={onClickDeletePlan}
                  editPlan={onClickEditPlan}
                  dataPlan={plan}
                ></CardPlan>
              ))}
            </ContainerPlans>
          )}
        </Container>
      </LayoutDashboard>
      <ModalPlan
        plan={planData}
        setPlan={setPlanData}
        visibleModal={visibleModal}
        handleModalToggle={() => {
          setIsEdit(false);
          setVisibleModal(!visibleModal);
          setImageProcessing({} as FileType);
        }}
        image={imageProcessing}
        setImage={setImageProcessing}
        handleSubmit={onSubmit}
      />
    </>
  );
};

export async function getServerSideProps(ctx: any) {
  const jwt = getCookie("token", ctx.req);

  if (!jwt) {
    redirect({ location: "/login", ctx });
  }
  return {
    props: { token: jwt },
  };
}

export default PlansPage;
