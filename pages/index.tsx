import { Box, Flex } from "@chakra-ui/react";
import {ShiftKey, TabKey, SpaceKey} from "../components/CustomKey"
import {useEffect, useState} from "react"
const Container = ({children})=>{
	return (
		<Flex bg="#00000077" h="8rem" w="24rem" borderRadius="2rem" align="center" p={5}>
			{children}
		</Flex>
	)
}


const Home = () => {
	const [globe, setGlobe] = useState<any>([])
	const style={
		justify:"center",
		align:"center",
		fontSize:"3rem", 
		minW:"3rem",
		h:"3rem",
		w:"3rem",
	}
	useEffect(()=>{
		function handleKeyDown(event) {
			console.log(event)
			const { key, repeat } = event
			if(!repeat){
				setGlobe((prev:any[]) => {
					if(key===" "){
						return prev.length >= 7? [...prev.slice(1), <SpaceKey />] : [...prev, <SpaceKey />] 
					}
					if(key==="Shift"){
						return prev.length >= 7? [...prev.slice(1), <ShiftKey />] : [...prev, <ShiftKey />] 
					}
					if(key==="Tab"){
						return prev.length >= 7? [...prev.slice(1), <TabKey />] : [...prev, <TabKey />] 
					}
					if(key==="Control"){
						return prev.length >= 7? [...prev.slice(1), <Flex {...style}>^</Flex>] : [...prev, <Flex {...style}>^</Flex>] 
					}
					return prev.length >= 7?
						[...prev.slice(key.length),<Flex {...style}>{key}</Flex>]
						:[...prev, <Flex {...style}>{key}</Flex>]
				})
			}
    	}
		window.addEventListener('keydown', handleKeyDown);
		return () => {
   			window.removeEventListener('keydown', handleKeyDown);
  		};
	},[])
  return (
    <Flex h="100%" w="100%" justify="center" align="center">
      <Container>{globe}</Container>
    </Flex>
  );
};
export default Home;
