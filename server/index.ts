import { Back } from "./server";
const ser = new Back();
ser.listen(port=> {
  console.log(`Server started ${port} `)
})
