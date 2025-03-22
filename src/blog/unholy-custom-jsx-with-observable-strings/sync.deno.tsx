import { of } from "rxjs"

const children = of("Hello World", "It was me, DIO")
;(<div>{children}</div>).subscribe(console.log)
