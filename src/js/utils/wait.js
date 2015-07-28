export default function wait (milliseconds) {
	return new Promise(resume => setTimeout(()=>resume(), milliseconds));
}
