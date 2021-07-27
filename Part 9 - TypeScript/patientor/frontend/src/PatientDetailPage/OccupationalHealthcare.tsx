import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../types";

import Date from "./Date";
import Description from "./Description";
import Diagnoses from "./Diagnoses";

interface OccupationalHealthcareProps {
  entry: OccupationalHealthcareEntry;
}
const OccupationalHealthcare: React.FC<OccupationalHealthcareProps> = ({
  entry,
}) => {
  return (
    <Segment>
      <div>
        <Date>{entry.date}</Date>
        <span>
          <Icon name="stethoscope" size="large" />
        </span>
        <span>{entry.employerName}</span>
      </div>

      <Description>{entry.description}</Description>

      {entry.diagnosisCodes && <Diagnoses entry={entry} />}

      {entry.sickLeave && (
        <div>
          <span className={styles.sickLeave}>From:</span>
          <span className={styles.sickLeaveDate}>
            {entry.sickLeave.startDate}
          </span>
          <span className={styles.sickLeave}>To:</span>
          <span className={styles.sickLeaveDate}>
            {entry.sickLeave.endDate}
          </span>
        </div>
      )}
    </Segment>
  );
};

export default OccupationalHealthcare;
