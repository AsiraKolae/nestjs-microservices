import { PhotoIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";

export function CardPlacehoderSkeleton() {
  return (
    <Card className="animate-pulse" placeholder="">
      <CardHeader
        shadow={false}
        floated={false}
        className="relative grid place-items-center"
        placeholder=""
      >
        <PhotoIcon 
            className="h-12 w-12 text-gray-500"
        />
      </CardHeader>
      <CardBody placeholder="">
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-full rounded-full bg-gray-300"
          placeholder=""
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-full rounded-full bg-gray-300"
          placeholder=""
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-full rounded-full bg-gray-300"
          placeholder=""
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-full rounded-full bg-gray-300"
          placeholder=""
        >
          &nbsp;
        </Typography>
      </CardBody>
    </Card>
  );
}