import { Box, Flex, Grid } from "@chakra-ui/react";
import {ShiftKey, TabKey, SpaceKey, EscKey, EnterKey, AltGraphKey, AltKey, BackspaceKey, ContextMenuKey} from "../components/CustomKey"
import {useEffect, useState} from "react"




const Home = () => {
	const [shiftPressed, setShiftPressed] = useState(false)
	const [ContrlPressed, setContrlPressed] = useState(false)
	const [AltPressed, setAltPressed] = useState(false)
	const [TabPressed, setTabPressed] = useState(false)
	const [isCapsLock, setIsCapsLock] = useState(false)
	let id = 0;
	interface props {
		children: React.FC | string | number | boolean | undefined | null
	}
	const Container = ({children}:props)=>{
		
		return (
			<Flex direction="column" borderRadius="2rem" overflow="hidden" w="18rem">
				<Flex bg="#00000077"  minH="6rem" w="100%" align="center" p={5} justify="center">
					{children}
				
				</Flex>
				<Grid w="100%" align="center" justify="space-evenly"  mt="2px"
					templateColumns ="1fr"
					templateRows ="1fr 1fr 1fr 1fr"
					templateAreas ={`"left mLeft mRight right"`}
					gap="2px"
				>
					<Flex bg="#00000077" h="100%" py={1} justify="center" align="center" gridArea="left">
						<ShiftKey h="1rem" w="1rem" width="1rem" fill={shiftPressed?"#ffffff":"#ffffff77"}/>
					</Flex>
					<Flex bg="#00000077" h="100%" py={1} justify="center" align="center" gridArea="mLeft">
						 <Box color={ContrlPressed?"#ffffff":"#ffffff77"}>^</Box>
					</Flex>
					<Flex bg="#00000077" h="100%" py={1} justify="center" align="center" gridArea="mRight">
						<AltKey h="1rem" w="1rem" width="1rem" fill={AltPressed?"#ffffff":"#ffffff77"}/>
					</Flex>
					<Flex bg="#00000077" h="100%" py={1} justify="center" align="center" gridArea="right">
						<TabKey h="1rem" w="1rem" width="1rem" fill={TabPressed?"#ffffff":"#ffffff77"}/>
					</Flex>
				</Grid>
				
			</Flex>
		)
	}
	
	
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
		function handleLoad(event) {
			console.log(event)
			if (event.getModifierState('CapsLock')) {
			console.log('Caps lock is enabled');
			} else {
			console.log('Caps lock is disabled');
			}
		}
		function handleKeyUp (event){
			const {key} = event;
			if(key==="Shift"){
				setShiftPressed(false)
				return
			}
			if(key==="Alt" || key==="AltGraph"){
				setAltPressed(false)
				return
			}
			if(key==="Tab"){
				setTabPressed(false)
				return
			}
			if(key==="Control"){
				setContrlPressed(false)
				return
			}
		}
		function handleKeyDown(event) {
			const limit = 5
			console.log(event)
			const { key, repeat } = event
			event.preventDefault();
			if(!repeat){
				setGlobe((prev:any[]) => {
					id++;
					if(key===" "){
						return prev.length >= limit? [...prev.slice(1), <SpaceKey key={id}/>] : [...prev, <SpaceKey key={id} />] 
					}
					if(key==="Backspace"){
						return prev.length >= limit? [...prev.slice(1), <BackspaceKey key={id}/>] : [...prev, <BackspaceKey key={id}/>] 
					}
					if(key==="Alt"){
						setAltPressed(true)
						return prev.length >= limit? [...prev.slice(1), <AltKey key={id}/>] : [...prev, <AltKey key={id}/>] 
					}
					if(key==="AltGraph"){
						setAltPressed(true)
						return prev.length >= limit? [...prev.slice(1), <AltGraphKey key={id}/>] : [...prev, <AltGraphKey key={id}/>] 
					}
					if(key==="ContextMenu"){
						return prev.length >= limit? [...prev.slice(1), <ContextMenuKey key={id}/>] : [...prev, <ContextMenuKey key={id} />] 
					}
					if(key==="Enter"){
						return prev.length >= limit? [...prev.slice(1), <EnterKey key={id}/>] : [...prev, <EnterKey key={id}/>] 
					}
					if(key==="Escape"){
						return prev.length >= limit? [...prev.slice(1), <EscKey key={id}/>] : [...prev, <EscKey key={id}/>] 
					}
					if(key==="Shift"){
						setShiftPressed(true)
						return prev.length >= limit? [...prev.slice(1), <ShiftKey key={id}/>] : [...prev, <ShiftKey key={id}/>] 
					}
					if(key==="Tab"){
						setTabPressed(true)
						return prev.length >= limit? [...prev.slice(1), <TabKey key={id}/>] : [...prev, <TabKey key={id}/>] 
					}
					if(key==="Control"){
						setContrlPressed(true)
						return prev.length >= limit? [...prev.slice(1), <Flex key={id}{...style}>^</Flex>] : [...prev, <Flex key={id}{...style}>^</Flex>] 
					}
					if(key==="CapsLock"){
						setIsCapsLock((prev => !prev))
						return [<Flex  key={id}{...style}>{key}</Flex>,,,,,]
					}
					
					return prev.length >= limit?
						[...prev.slice(key.length),<Flex  key={id}{...style}>{key}</Flex>]
						:[...prev, <Flex key={id}{...style}>{key}</Flex>]
				})
			}
    	}
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
		window.addEventListener('load', handleLoad);
		return () => {
   			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
			window.addEventListener('load', handleLoad);
  		};
	},[])
  return (
    <Flex h="100%" w="100%" justify="center" align="center">
      <Container>{globe}</Container>
    </Flex>
  );
};
export default Home;
