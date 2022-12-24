import NextLink from "next/link";
import { useColorModeValue, Link } from "@chakra-ui/react";

type props = {
	href: string;
	path: string;
	children: any;
};
type style={}//This is because the type of the props it's an empty object

const LinkItem = ({ href, path, children }: props) => {
	const active = path === href;
	const color = useColorModeValue("black", "whiteAlpha.900");
	const LinkStyle: style = {
		p: 2,
		color: color,
		borderRadius: "md",
		position: "relative",

		_before: !active
			? {
					content: '""',
					position: "absolute",
					bottom: "12%",
					left: "50%",
					h: "1px",
					w: 0,
					transition: "all 200ms ease",
					bg: color,
			  }
			: {
					content: '""',
					position: "absolute",
					bottom: "12%",
					left: 0,
					h: "1px",
					w: "100%",
					transition: "all 200ms ease",
					bg: color,
			  },
		_hover: !active
			? {
					_before: {
						left: 0,
						w: "100%",
					},
			  }
			: {},
	};
	return (
		<NextLink href={href} passHref>
			<Link {...LinkStyle}>{children}</Link>
		</NextLink>
	);
};

export default LinkItem;