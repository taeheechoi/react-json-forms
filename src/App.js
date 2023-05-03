import { person } from "@jsonforms/examples";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import { makeStyles } from "@mui/styles";
import { Fragment, useState, useMemo } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import logo from "./logo.svg";
import "./App.css";

const useStyles = makeStyles({
  container: {
    padding: "1em",
    width: "100%",
  },
  title: {
    textAlign: "center",
    padding: "0.25em",
  },
  dataContent: {
    display: "flex",
    justifyContent: "center",
    borderRadius: "0.25em",
    backgroundColor: "#cecece",
    marginBottom: "1rem",
  },
  resetButton: {
    margin: "auto !important",
    display: "block !important",
  },
  demoform: {
    margin: "auto",
    padding: "1rem",
  },
});

const schema = person.schema;
const uischema = person.uischema;
const initialData = person.data;

// const renderers = [
//   ...materialRenderers,
//   //register custom renderers
//   { tester: ratingControlTester, renderer: RatingControl },
// ];

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState(initialData);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const clearData = () => {
    setData({});
  };

  return (
    <Fragment>
      <Grid
        container
        justifyContent={"center"}
        spacing={1}
        className={classes.container}
      >
        <Grid item sm={6}>
          <Typography variant={"h4"} className={classes.title}>
            Bound data
          </Typography>
          <div className={classes.dataContent}>
            <pre id="boundData">{stringifiedData}</pre>
          </div>
          <Button
            className={classes.resetButton}
            onClick={clearData}
            color="primary"
            variant="contained"
          >
            Clear data
          </Button>
        </Grid>
        <Grid item sm={6}>
          <Typography variant={"h4"} className={classes.title}>
            Rendered form
          </Typography>
          <div className={classes.demoform}>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={data}
              renderers={materialRenderers}
              cells={materialCells}
              onChange={({ errors, data }) => setData(data)}
            />
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
