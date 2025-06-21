import { SVGProps } from "react"

const RoadwiseLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={512}
    height={512}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-chevron-up-icon lucide-chevron-up"
    {...props}
  >
    <rect
      width={512}
      height={512}
      stroke="none"
      ry={91.733}
      style={{
        fill: "#000",
        fillOpacity: 1,
        strokeWidth: 0,
        strokeDasharray: "none",
        paintOrder: "markers stroke fill",
        stroke: "none",
      }}
    />
    <path
      d="M411.177 333.588 256 178.41 100.823 333.588"
      style={{
        fill: "none",
        fillOpacity: 0,
        stroke: "#fff",
        strokeWidth: 51.726,
        strokeOpacity: 1,
        strokeDasharray: "none",
      }}
    />
  </svg>
)
export default RoadwiseLogo
