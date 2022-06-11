import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import ConfigInitialTable from "../../../components/configinitialtable";
import LayoutDashboard from "../../../layout/Dashboard";
import { ALLCONFIGINITIAL } from "../../../graphql/query/query.configinitial";
import { useEffect, useState } from "react";
import { ConfigInitial } from "../../../models/ConfigInitialType";

import { ContainerActions, Container } from "../../../styles/style.configinitial";
import { Button } from "@nextui-org/react";
import Add from "../../../assets/svg-components/add";
import ModalConfigInitial from "../../../components/modalCofigInitial";
import { CREATECONFIGINITIAL } from "../../../graphql/mutation/mutation.configinitial";

const ConfigInitialPage = () => {
  const router = useRouter();

  const routerActual = router.pathname.split("/")[2];

  const [getConfigInitial, { data }] = useLazyQuery(ALLCONFIGINITIAL);
  const [visibleModal, setVisibleModal] = useState(false);
  const [dataUpdateConfigInitial, setDataUpdateConfigInitial] =
    useState<ConfigInitial | null>(null);
  const [createConfigInitial, setCreateConfigInitial] =
    useMutation(CREATECONFIGINITIAL);
  const [configInitial, setConfigInitial] = useState<ConfigInitial[]>([]);
  const [stateUpdate, setStateUpdate] = useState<boolean>(false);
  useEffect(() => {
    const allConfigInitial = async () => {
      const res = await getConfigInitial();
      if (res.data.allConfigInitial) {
        setConfigInitial(res.data.allConfigInitial);
      }
    };
    allConfigInitial();
  }, [getConfigInitial, stateUpdate, configInitial]);

  const onclickNewConfigInitial = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (dataUpdateConfigInitial) {
      const res = await createConfigInitial({
        variables: {
          data: {
            ...dataUpdateConfigInitial,
          },
        },
      });
      if (res.data?.createConfigInitial) {
        alert("Update Config Initial");
        setStateUpdate(!stateUpdate);
      }
    }
  };

  return (
    <>
      <LayoutDashboard routeActual={routerActual}>
        <Container>
          <ContainerActions>
            {configInitial.length > 0 ? (
              <Button
                icon={<Add color="#ffffff" />}
                disabled
                onClick={() => {}}
              >
                Add ConfigInitial
              </Button>
            ) : (
              <Button
                icon={<Add color="#ffffff" />}
                onClick={() => setVisibleModal(!visibleModal)}
              >
                Add ConfigInitial
              </Button>
            )}
          </ContainerActions>

          <ConfigInitialTable
            data={configInitial as ConfigInitial[]}
            stateUpdate={stateUpdate}
            setStateUpdate={setStateUpdate}
          />
        </Container>
      </LayoutDashboard>
      <ModalConfigInitial
        visibleModal={visibleModal}
        handleModalToggle={() => setVisibleModal(!visibleModal)}
        onSubmit={onclickNewConfigInitial}
        dataConfigInitial={dataUpdateConfigInitial}
        setDataConfigInitial={setDataUpdateConfigInitial}
      />
    </>
  );
};

export default ConfigInitialPage;
