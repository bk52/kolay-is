import React from 'react';
import {
  useParams
} from "react-router-dom";

export default function ComingSoon(props) {
  let { pageName } = useParams();
  return <div>{pageName} - Coming Soon</div>;
}
