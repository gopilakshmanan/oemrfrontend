const Todo = () => {
    return (
        <section>
            <h1>TO DO:</h1>
            <ol>
                <li>Plan</li>
                <ol>
                    <li>For small clinics - only a provider acts as admin/ma/md or couple of real admin/ma/md</li>
                    <li>Create a spring-boot app to handle public API calls</li>
                    <li>Implement prescription/in-house pharmacy module</li>
                    <li>How would revenue cycle work?</li>
                </ol>
                <li>Dashboard</li>
                    <ol>
                        <li>Make status search workable in dashboard</li>
                        <li>Highlight modified row</li>
                    </ol>
                <li>Partially completed items</li>   
                <ol>
                    <li>Review Chief Complaint/New Patient Form</li>
                    <li>PUT method does not work for Vital</li>
                    <li>DELETE method does not exists for Vitals</li>
                    <li>Implement other forms</li>
                </ol>
            </ol>
        </section>
    )
}

export default Todo