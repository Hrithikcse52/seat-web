import styled from "styled-components";

const ImageLoader = styled.img`
  width: 20%;
`;

export default function Loader() {
  return (
    <div className=" flex justify-center items-center ">
      <ImageLoader alt="loader" className="w-64" src="/loader.svg" />
    </div>
  );
}
