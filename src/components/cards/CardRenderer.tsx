import type {
  CardData,
  ScheduleCardData,
  PayCardData,
  OvertimeCardData,
  SwapCardData,
  TrainingCardData,
  HolidayCardData,
} from "@/types";
import { ScheduleCard } from "./ScheduleCard";
import { PayCard } from "./PayCard";
import { OvertimeCard } from "./OvertimeCard";
import { SwapCard } from "./SwapCard";
import { TrainingCard } from "./TrainingCard";
import { HolidayCard } from "./HolidayCard";

export function CardRenderer({ card }: { card: CardData }) {
  switch (card.type) {
    case "schedule":
      return <ScheduleCard data={card.data as unknown as ScheduleCardData} />;
    case "pay":
      return <PayCard data={card.data as unknown as PayCardData} />;
    case "overtime":
      return <OvertimeCard data={card.data as unknown as OvertimeCardData} />;
    case "swap":
      return <SwapCard data={card.data as unknown as SwapCardData} />;
    case "training":
      return <TrainingCard data={card.data as unknown as TrainingCardData} />;
    case "holiday":
      return <HolidayCard data={card.data as unknown as HolidayCardData} />;
    default:
      return null;
  }
}
