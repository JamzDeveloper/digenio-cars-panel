import { Plan } from "../../models/Plan";

export type Props = {
  dataPlan: Plan;
  deletePlan: (id: string) => void;
  editPlan: (plan:Plan) => void;
  toggleActive: (id: string) => void;
};
