import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Patient } from "../Types/Patient";
interface CardProps {
  patientsData: Patient[];
}

export default function BasicCard(props: CardProps) {
  return (
    <>
      {props.patientsData.map((item) => {
        return (
          <Card
            key={item.id}
            sx={{
              minWidth: 100,
              marginBottom: "15px",
              marginTop: "15px",
              padding: "15px",
              marginLeft: "15%",
              marginRight: "15%",
            }}
          >
            <CardContent style={{ fontFamily: "arial sans-serif" }}>
              <Typography variant="h5" component="div">
                {`${item.first_name} ${item.last_name}`}
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                Id: {item.id}
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                Clinic ID: {item.clinic_id}
              </Typography>
              <Typography variant="body2">DOB:{item.date_of_birth}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
