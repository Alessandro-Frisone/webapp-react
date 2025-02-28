import Heading from "./ui/Heading";
import Paragraph from "./ui/Paragraph";
import Stars from "./ui/Stars";

export default function Review({ review }) {
  return (
    <>
      <Heading level={4}>{review.name}</Heading>
      <Stars vote={review.vote} />
      <Paragraph>{review.text}</Paragraph>
    </>
  );
}