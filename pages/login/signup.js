import SignUp from "../../src/components/sign/SignUp";
import { gql } from "@apollo/client";
import apolloClient from "../../lib/apolloClient";

const SignUpPage = ({data}) => {
  return (
    <div>
      <SignUp data={data} />
    </div>
  );
};

export default SignUpPage;



export const getStaticProps = async () => {
  const { data } = await apolloClient.query({
    query: gql`
    query MyQuery {
      cities {
        name
      }
    }
    
    `,
  });

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
};
