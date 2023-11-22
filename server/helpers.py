def get_assigned_pools(technician):
    # Implement logic to retrieve assigned pools for the technician
    if technician:
        assigned_pools = [pool_visit.pool.to_dict() for pool_visit in technician.pool_visits]
        return assigned_pools
    else:
        return []

def get_related_client(technician):
    # Implement logic to retrieve related client information for the technician
    if technician and technician.clients:
        related_client = technician.clients[0].to_dict()  # assuming the technician has at least one client
        return related_client
    else:
        return None